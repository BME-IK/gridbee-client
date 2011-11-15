templates ?= []

templates.push
  type : BoincTemplate
  parameters :
    templatename : 'boinc-bvp6-demo'
    formtitle : 'Bvp6 demo project'
    description : 'This is a demo project that demonstrates the ease of use our client program. It calculates something related to pebbles.'
    hide : ['projecturl', 'scheduler', 'authkey', 'username_password']
    ok : true

    projectname : 'Bvp6 demo project'
    projecturl : 'http://bvp6.hpc.iit.bme.hu/w2g/'
    scheduler : 'http://bvp6.hpc.iit.bme.hu/w2g_cgi/cgi'
    authkey : '2962b0b8970c4ca693d953da648724cd'

templates.push
  type : BoincTemplate
  parameters :
    templatename : 'boinc-userpass'
    formtitle : 'Custom BOINC project'
    description : 'Specify the project url of the BOINC project, and the user\'s credentials to participate in the project.'
    hide : ['scheduler', 'authkey']
    ok : false

    projectname : 'Custom BOINC project'

templates.push
  type : BoincTemplate
  parameters :
    templatename : 'boinc'
    formtitle : 'Custom BOINC project'
    description : 'Specify the project url of the BOINC project, and the user\'s credentials to participate in the project.'
    ok : false

    projectname : 'Custom BOINC project'
