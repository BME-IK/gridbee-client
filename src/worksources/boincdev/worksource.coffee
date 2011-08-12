class BoincDev extends Worksource
  type : 'boincdev'

  description : 'BOINC project, by scheduler and authkey'

  constructor : ->
    super()

    @authkey = ko.observable '1d0f37563ceb7d1ed372a932dcdb5d85'
    @scheduler = ko.observable 'http://ui.hpc.iit.bme.hu/wcdemo_cgi/cgi'
    @ok = ko.observable true

    @living.subscribe (living) =>
      if not living
        @destroy()

  create : =>
    @name = ko.observable 'Test'
    @living true

  destroy : =>
    # Destructor

Worksource.prototype.register(BoincDev)
