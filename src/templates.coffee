templates ?= []

templates.push new BoincNewWorksourceForm
  formtitle : 'Add Bvp6 demo project'
  description : 'Description'
  projectname : 'Bvp6 demo'
  projecturl : 'http://bvp6.hpc.iit.bme.hu/w2g'
  scheduler : 'http://bvp6.hpc.iit.bme.hu/w2g_cgi/cgi'
  authkey : '2962b0b8970c4ca693d953da648724cd'
  hide : ['projecturl', 'scheduler', 'authkey', 'username_password']
  ok : true

templates.push new BoincNewWorksourceForm
  formtitle : 'Add BOINC project'
  description : 'Description'
  hide : ['scheduler', 'authkey']
  ok : false

templates.push new BoincNewWorksourceForm
  formtitle : 'Add BOINC project (for developers)'
  description : 'Description'
  ok : false
