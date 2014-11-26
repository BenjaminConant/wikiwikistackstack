var data = [{
    "value": "Microsoft",
    "url": "http://www.microsoft.com"
}, {
    "value": "Facebook",
    "url": "http://www.facebook.com"
}, {
    "value": "Google",
    "url": "http://www.google.com"
}, {
    "value": "Twitter",
    "url": "http://www.twitter.com"
}, {
    "value": "Wikipedia",
    "url": "http://www.wikipedia.com"
}, {
    "value": "Instagram",
    "url": "http://www.instagram.com"
}, {
    "value": "Yahoo",
    "url": "http://www.yahoo.com"
}, {
    "value": "Hulu",
    "url": "http://www.hulu.com"
}, {
    "value": "Netflix",
    "url": "http://www.netflix.com"
}, {
    "value": "Amazon",
    "url": "http://www.amazon.com"
}, {
    "value": "Facebook Messenger",
    "url": "http://www.facebook.com"
}, {
    "value": "Comcast",
    "url": "http://www.comcast.com"
}, {
    "value": "Apple",
    "url": "http://www.apple.com"
}, {
    "value": "Time Warner",
    "url": "http://www.timewarnercable.com"
}, {
    "value": "eBay",
    "url": "http://www.ebay.com"
}, {
    "value": "PayPal",
    "url": "http://www.paypal.com"
}, {
    "value": "YouTube",
    "url": "http://www.youtube.com"
}, {
    "value": "LinkedIn",
    "url": "http://www.linkedin.com"
}, {
    "value": "Bing",
    "url": "http://www.bing.com"
}, {
    "value": "Tumblr",
    "url": "http://www.tumblr.com"
}, {
    "value": "GoDaddy",
    "url": "http://www.godaddy.com"
}];
$('.agreements').typeahead({
    name: 'agreements',
    local: data,
    limit: 8,
    template: '<p>{{value}}</p>',
    engine: Hogan
}).on('typeahead:selected', function(event, datum) {
    window.location = datum.url
});
$('input.typeahead').on('typeahead:selected', function(event, selection) {
    alert(selection.value);
});
$('input.typeahead').typeahead('setQuery', '');
$('.typeahead.input-sm').siblings('input.tt-hint').addClass('hint-small');
$('.typeahead.input-lg').siblings('input.tt-hint').addClass('hint-large');
