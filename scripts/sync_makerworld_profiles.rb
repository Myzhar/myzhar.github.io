#!/usr/bin/env ruby
# frozen_string_literal: true

# Synchronize the public print-profile catalogue published by MakerWorld.
#
# MakerWorld's HTML is Cloudflare-protected, but its public design-service API
# exposes the same profile list without requiring a logged-in browser.  This
# keeps the static site complete while avoiding brittle screen scraping.

require "json"
require "net/http"
require "uri"
require "yaml"

ROOT = File.expand_path("..", __dir__)
PROJECTS = File.join(ROOT, "_projects", "makerworld")
DATA_FILE = File.join(ROOT, "_data", "makerworld_profiles.yml")
API_ROOT = "https://api.bambulab.com/v1/design-service/design"
PROFILE_SECTION = "## Print profiles\n\n{% include makerworld-profiles.html %}"

def fetch_json(url)
  uri = URI(url)
  response = Net::HTTP.start(uri.host, uri.port, use_ssl: true, open_timeout: 15, read_timeout: 60) do |http|
    http.get(uri.request_uri, { "Accept" => "application/json", "User-Agent" => "myzhar.github.io profile sync" })
  end
  raise "#{uri}: HTTP #{response.code}" unless response.is_a?(Net::HTTPSuccess)

  JSON.parse(response.body)
end

def all_instances(model_id)
  offset = 0
  profiles = []
  loop do
    page = fetch_json("#{API_ROOT}/#{model_id}/instances?limit=100&offset=#{offset}")
    hits = page.fetch("hits", [])
    profiles.concat(hits)
    offset += hits.length
    break if hits.empty? || offset >= page.fetch("total", 0)
  end
  profiles
end

def duration(seconds)
  return "—" if seconds.nil? || seconds.to_i <= 0

  hours, remainder = seconds.to_i.divmod(3600)
  minutes = remainder / 60
  hours.positive? ? "#{hours} h #{minutes} min" : "#{minutes} min"
end

def material_summary(profile)
  detailed = profile["detail"].to_h.dig("instanceFilaments")
  materials = detailed.nil? || detailed.empty? ? profile["instanceFilaments"] || [] : detailed
  materials.map { |material| [material["type"], material["usedG"] && "#{material['usedG']} g"].compact.join(" ") }.join(", ")
end

def positive_value(profile, key)
  detailed_value = profile["detail"].to_h[key]
  return detailed_value if detailed_value.to_i.positive?

  value = profile[key]
  value if value.to_i.positive?
end

catalogue = {}

Dir.glob(File.join(PROJECTS, "*.md")).sort.each do |path|
  document = File.read(path)
  model_id = document[/makerworld\.com\/en\/models\/(\d+)/, 1]
  next unless model_id

  front_matter, body = document.split(/^---\s*$\n?/, 3)[1..]
  unless front_matter.match?(/^makerworld_id:/)
    front_matter = "makerworld_id: #{model_id}\n#{front_matter}"
  end
  unless front_matter.match?(/^makerworld_key:/)
    front_matter = "makerworld_key: model_#{model_id}\n#{front_matter}"
  end

  puts "Fetching #{File.basename(path)} (#{model_id})"
  profiles = all_instances(model_id)
  # Prefixing keys prevents YAML from interpreting numeric model ids as integer
  # keys, which Liquid cannot reliably look up from front matter.
  catalogue["model_#{model_id}"] = profiles.map do |profile|
    {
      "id" => profile.fetch("profileId"),
      "title" => profile.fetch("title"),
      "materials" => material_summary(profile),
      "weight" => positive_value(profile, "weight"),
      "print_time" => duration(positive_value(profile, "prediction"))
    }
  end

  # Replace legacy hand-maintained tables, or insert the common section just
  # before Download.  This makes every MakerWorld project render identically.
  if body.match?(/^## (Printing|Print profiles)\s*$/)
    body.sub!(/^## (Printing|Print profiles)\s*$.*?(?=^## |\z)/m, "#{PROFILE_SECTION}\n\n")
  else
    body.sub!(/^## Download\s*$/m, "#{PROFILE_SECTION}\n\n## Download")
  end

  File.write(path, "---\n#{front_matter}---\n#{body}")
end

File.write(DATA_FILE, catalogue.to_yaml)
puts "Wrote #{DATA_FILE}"
