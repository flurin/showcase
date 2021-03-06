require 'fileutils'
include FileUtils

YuiCompressorJar = "yuicompressor-2.3.5.jar"

if File.exists?("vendor/#{YuiCompressorJar}")
  YuiCompressor = "java -jar vendor/#{YuiCompressorJar}" #" --type %s --charset UTF-8 --line-break 80 -v -o %s
else
  YuiCompressor = false
end

desc "Builds an example showcase in ./release"
task :build do
  target = "release"
  mkdir_p("#{target}/showcase")
  mkdir_p("#{target}/images")
  cp(["test/images/img1.jpg", "test/images/img2.jpg"],"#{target}/images")
  cp(Dir["src/images/*"],"#{target}/showcase")  
  
  #1. Compress src/javascript/showcase.js
  showcase_js_src = "src/javascript/showcase.js"
  showcase_js = yui_compress(showcase_js_src,"--type js --charset UTF-8 --line-break 80 -v")
  
  #2. Build #{target}/showcase/showcase.js
  #    - vendor/mootools.js
  #    - \n
  #    - first line of src/javascript/showcase.js
  #    - compressed content
  target_js = []
  target_js << (banner = File.open(showcase_js_src){|f| f.gets.strip })
  target_js << File.read("vendor/mootools.js")
  target_js << "\n"
  target_js << banner
  target_js << showcase_js
  File.open("#{target}/showcase/showcase.js","w"){|f| f.write target_js.join("\n")}
  
  #3. Compress src/stylesheets/showcase.css -> #{target}/showcase/showcase.css
  File.open("#{target}/showcase/showcase.css","w") do |f|
    f.write yui_compress("src/stylesheets/showcase.css","--type css --charset UTF-8 --line-break 80 -v").gsub("../images/","")
  end
  
  #3. Compress src/stylesheets/ie.css -> #{target}/showcase/showcase_ie.css  
  File.open("#{target}/showcase/showcase_ie.css","w") do |f|
    f.write yui_compress("src/stylesheets/ie.css","--type css --charset UTF-8 --line-break 80 -v")
  end

  #5. Build #{target}/index.html  
  index_html = File.read("test/index.html")
  
  # remove mootools
  index_html.gsub!(/^\s*<script.*?src.*?mootools.js[^<]+<\/script>$/,'')
  
  {"../src/stylesheets/showcase.css" => "showcase/showcase.css",
   "../src/stylesheets/ie.css" => "showcase/showcase_ie.css",
   "../src/javascript/showcase.js" => "showcase/showcase.js"}.each do |orig,repl|
     index_html.gsub!(orig,repl)
  end
  
  File.open("#{target}/index.html","w"){|f| f.write index_html }
  
end

def yui_compress(file,params)
  return File.read(file) unless YuiCompressor
  `#{YuiCompressor} #{params} #{file}`
end