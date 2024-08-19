# frozen_string_literal: true

Jekyll::Hooks.register :site, :post_write do |site|
  # Make the directory
  site.posts.docs.each do |post|
    inp = "#{site.dest}#{post.url}"
    out = inp.gsub(/html$/, 'roff')
    date = post.date

    `pandoc -M section=7 -M author=hexylena -M date="#{date}" -s -t man #{inp} -o #{out}`
  end
end
