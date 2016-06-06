// This is the base controller. Used for base routes, such as the default index/root path, 404 error pages, and others.
module.exports = {

    index: {
        handler: function(request, reply){
          reply.file('.tmp/serve/index.html');
        }
    },

    missing: {
        handler: function(request, reply){
          reply.file('assets/404.html');
        }
    }

}
