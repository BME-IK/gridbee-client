fs            = require 'fs'
{print}       = require 'sys'
{spawn, exec} = require 'child_process'
less          = require 'less'

# Defined worksources
worksources = ['boinc']

# CoffeeScript source files
sourcefiles = []

wsdir = 'src/worksources/'
sourcefiles.push wsdir + 'worksource.coffee'
sourcefiles.push wsdir + 'workunit.coffee'
sourcefiles.push wsdir + 'newworksourceform.coffee'

for ws in worksources
  sourcefiles.push wsdir + ws + '/worksource.coffee'
  sourcefiles.push wsdir + ws + '/workunit.coffee'
  sourcefiles.push wsdir + ws + '/newworksourceform.coffee'

sourcefiles.push 'src/templates.coffee'
sourcefiles.push 'src/gridbee.coffee'

# JQuery templates
templates = {}

for ws in worksources
  templates['settings-' + ws] = wsdir + ws + '/settings.tmpl'
  templates['newworksourceform-' + ws] = wsdir + ws + '/newworksourceform.tmpl'


compile_scripts = (callback) ->
  print 'Compiling CoffeeScript source files...\n'

  options = ['--compile'
             '--output', 'bin'
             '--join', 'gridbee.js']

  coffee = spawn 'coffee', options.concat sourcefiles
  coffee.stdout.on 'data', (data) -> print data.toString()
  coffee.stderr.on 'data', (data) -> print data.toString()
  coffee.on 'exit', (status) -> callback?() if status is 0

compile_styles = (callback) ->
  print 'Compiling LESS stylesheets...\n'

  style = (fs.readFileSync 'src/gridbee.less').toString()
  less.render style, (error, css) ->
    if error then return console.error(error)
    file = fs.openSync 'bin/gridbee.css', 'w'
    fs.writeSync file, css, 0
    fs.closeSync file
    callback?()

add_templates = () ->
  print 'Adding templates to gridbee.html...\n'

  html = (fs.readFileSync 'src/gridbee.html').toString()

  for name, templatefile of templates
    templatehtml = fs.readFileSync templatefile
    scripttag = "<script type=\"text/html\" id=\"#{name}\">\n#{templatehtml}</script>\n\n"
    html = html.replace '</body>', scripttag + '</body>'

  file = fs.openSync 'bin/gridbee.html', 'w'
  fs.writeSync file, html, 0
  fs.closeSync file

copy_images = () ->
  print 'Copying image files\n'

  copy = (ws) ->
    (spawn 'mkdir', ['-p', "bin/img/${ws}"]).on 'exit', ->
      spawn 'sh', ['-c', "cp src/worksources/#{ws}/*.png bin/img/#{ws}/"]

  for worksource in worksources
    copy worksource

task 'build', 'Compile CoffeeScript source files', ->
  compile_scripts()
  compile_styles()
  add_templates()
  copy_images()

task 'watch', 'Recompile CoffeeScript source files when modified', ->
  compile_scripts()
  compile_styles()
  add_templates()
  copy_images()

  for sourcefile in sourcefiles
    fs.watchFile sourcefile, -> compile_scripts()

  fs.watchFile 'src/gridbee.less', -> compile_styles()

  for name, templatefile of templates
    fs.watchFile templatefile, -> add_templates()

  fs.watchFile 'src/gridbee.html', -> add_templates()
