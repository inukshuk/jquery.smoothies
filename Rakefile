
require 'jasmine'
load 'jasmine/tasks/jasmine.rake'

require 'json'
require 'uglifier'

LICENSE = <<-END
/*!
 * jQuery Smoothies
 * https://github.com/inukshuk/jquery-smoothies
 *
 * Copyright 2011, Sylvester Keil
 * Licensed under the MIT license.
 * https://github.com/inukshuk/jquery-smoothies/blob/master/LICENSE
 *
 * Date: #{ Time.now.to_s }
 */
END

task :minify => [] do
  File.open('jquery.smoothies.min.js', 'w') do |f|
    f.puts LICENSE
    f.puts Uglifier.new.compile(File.read('src/smoothies.js'))
  end
end

task :build => [:minify] do
  File.open('jquery.smoothies.dep.min.js', 'w') do |f|
    f.puts File.read('lib/jquery.ba-hashchange.min.js')
    f.puts File.read('lib/jquery.viewport.min.js')
    f.puts File.read('jquery.smoothies.min.js')
  end
end