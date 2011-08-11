fs            = require 'fs'
{print}       = require 'sys'
{spawn, exec} = require 'child_process'

# Defined worksources
worksources = ['boincdev', 'boinc']

# CoffeeScript source files
sourcefiles = []

wsdir = 'src/worksources/'
sourcefiles.push wsdir + 'worksource.coffee'
sourcefiles.push wsdir + 'workunit.coffee'

for ws in worksources
  sourcefiles.push wsdir + ws + '/worksource.coffee'
  sourcefiles.push wsdir + ws + '/workunit.coffee'

sourcefiles.push 'src/gears.coffee'

# JQuery templates
templates = {}

for ws in worksources
  templates['settings-' + ws] = wsdir + ws + '/settings.tmpl'
  templates['createform-' + ws] = wsdir + ws + '/createform.tmpl'


compile_scripts = (callback) ->
  print 'Compiling CoffeeScript source files...\n'

  options = ['--compile'
             '--output', 'bin'
             '--join', 'gears.js']

  coffee = spawn 'coffee', options.concat sourcefiles
  coffee.stdout.on 'data', (data) -> print data.toString()
  coffee.stderr.on 'data', (data) -> print data.toString()
  coffee.on 'exit', (status) -> callback?() if status is 0

add_templates = () ->
  print 'Adding templates to gears.html...\n'

  html = (fs.readFileSync 'src/gears.html').toString()

  for name, templatefile of templates
    templatehtml = fs.readFileSync templatefile
    scripttag = "<script type=\"text/html\" id=\"#{name}\">\n#{templatehtml}</script>\n\n"
    html = html.replace '</body>', scripttag + '</body>'

  file = fs.openSync 'bin/gears.html', 'w'
  fs.writeSync file, html, 0
  fs.closeSync file

task 'build', 'Compile CoffeeScript source files', ->
  compile_scripts()
  add_templates()

task 'watch', 'Recompile CoffeeScript source files when modified', ->
  compile_scripts()
  add_templates()

  for sourcefile in sourcefiles
    fs.watchFile sourcefile, -> compile_scripts()

  for name, templatefile of templates
    fs.watchFile templatefile, -> add_templates()

