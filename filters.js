// Setting custom filters on Swig
module.exports = function(swig) {
  var page_link = function (doc) {
    var link_name;
    if (typeof doc.title !== "undefined" && doc.title !== "") {
      link_name = doc.title
    } else {
      link_name = "Page "+doc.url_name;
    }
    return "<a href='/wiki/"+doc.url_name+"'>"+link_name+"</a>";
  };
  page_link.safe = true;

  var marked = require('marked');
  var markedFilter = function(body) {
    return marked(body);
  }
  markedFilter.safe = true;

  var page_link_id = function (doc) {
    var link_name;
    if (typeof doc.title !== "undefined" && doc.title !== "") {
      link_name = doc.title
    } else {
      link_name = "Page "+doc.url_name;
    }
    return "<a href='/wiki/id/"+doc.id+"'>"+link_name+"</a>";
  };
  page_link_id.safe = true;



  swig.setFilter('page_link_id', page_link_id);
  swig.setFilter('marked', markedFilter);
  swig.setFilter('page_link', page_link);
};