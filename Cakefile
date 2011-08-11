fs            = require 'fs'
{print}       = require 'sys'
{spawn, exec} = require 'child_process'

sourcefiles = []

wsdir = 'src/worksources/'
sourcefiles.push wsdir + 'worksource.coffee'
sourcefiles.push wsdir + 'workunit.coffee'

worksources = ['boincdev', 'boinc']
for ws in worksources
  sourcefiles.push wsdir + ws + '/worksource.coffee'
  sourcefiles.push wsdir + ws + '/workunit.coffee'

sourcefiles.push 'src/gears.coffee'

build = (callback) ->
  print 'Building...\n'

  options = ['--compile'
             '--output', 'bin'
             '--join', 'gears.js']

  coffee = spawn 'coffee', options.concat sourcefiles
  coffee.stdout.on 'data', (data) -> print data.toString()
  coffee.stderr.on 'data', (data) -> print data.toString()
  coffee.on 'exit', (status) -> callback?() if status is 0


task 'build', 'Compile CoffeeScript source files', ->
  build()

task 'watch', 'Recompile CoffeeScript source files when modified', ->
  build()
  for sourcefile in sourcefiles
    fs.watchFile sourcefile, -> build()

