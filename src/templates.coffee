templates ?= []

templates.push
  type : BoincTemplate
  parameters :
    templatename : 'boinc-bvp6-demo'
    formtitle : 'Add Bvp6 demo project'
    description : 'Description'
    hide : ['projecturl', 'scheduler', 'authkey', 'username_password']
    ok : true

    projectname : 'Bvp6 demo'
    projecturl : 'http://bvp6.hpc.iit.bme.hu/w2g'
    scheduler : 'http://bvp6.hpc.iit.bme.hu/w2g_cgi/cgi'
    authkey : '2962b0b8970c4ca693d953da648724cd'

templates.push
  type : BoincTemplate
  parameters :
    templatename : 'boinc-userpass'
    formtitle : 'Add BOINC project'
    description : 'Description'
    hide : ['scheduler', 'authkey']
    ok : false

    projectname : 'New BOINC project'

templates.push
  type : BoincTemplate
  parameters :
    templatename : 'boinc'
    formtitle : 'Add BOINC project (for developers)'
    description : 'Description'
    ok : false

    projectname : 'New BOINC project'
