#!/bin/env ruby
#encoding: utf-8
entries = File.read('transcriptions/transcriptions-from-gwen.txt').split("\n\n")
def parse_credit_line(e)
  match = e.match(/^-(.*) describing (.*) by (.*+?)/)
  _, name, title, artist_date = match.to_a.map(&:strip)
  artist, date = artist_date.split(',').map(&:strip)
  [name, title, artist, date]
end

entries.each do |e|
  name, title, artist, date = parse_credit_line(e)
  title = title.gsub(/[“|”]/, '')

  p [name, title, artist, date]
  post = "---\npublished: false\ntitle: #{title}\nartist: #{artist}\n---"
  post+= "\n\n> #{e.gsub("\n", "\n> ")}"

  slug = title.gsub(/\W/, '-').gsub('--', '-')
  File.write("_posts/2013-04-17-#{slug}.md", post)
end

__END__
---
published: false
title:
artist: Egon Schiele
---
