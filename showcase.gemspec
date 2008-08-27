Gem::Specification.new do |s|
    s.platform  =   Gem::Platform::RUBY
    s.name      =   "showcase"
    s.version   =   "0.9.0"
    s.date      =   "2008-08-27"
    s.author    =   "Flurin Egger"
    s.email     =   "flurin@digitpaint.nl"
    s.summary   =   "A simple display case for images."
    s.files     =   Dir["release/**/*"] + Dir["src/**/*"] + ["README", "vendor/mootools.js", "bin/showcase"]

    s.bindir = 'bin'
    s.executables << "showcase"

#    s.homepage = "http://github/schacon/ticgit"

    s.require_paths = ["bin"]
end
