max_id = 0

class Workunit
  # Unique identifier, needed for simple logging
  id : null

  # Status string. Something like 'Working' or 'Uploading', etc.
  status : ko.observable ''

  # Progress of the work
  progress : ko.observable 0

  constructor: (@workunit) ->
    @id = max_id++

    @status = ko.observable ''

    @progress = ko.observable 0
