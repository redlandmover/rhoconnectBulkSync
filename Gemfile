source 'http://rubygems.org'

gem 'rhoconnect', '4.1.1'

gemfile_path = File.join(File.dirname(__FILE__), ".rcgemfile")
begin
  eval(IO.read(gemfile_path))
rescue Exception => e
  puts "ERROR: Couldn't read RhoConnect .rcgemfile"
  exit 1
end

# Add your application specific gems after this line ..
gem 'sqlite3', ">= 1.3.3", :platforms => [:ruby, :mswin, :mingw]
