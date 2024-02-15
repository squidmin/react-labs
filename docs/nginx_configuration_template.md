# Nginx configuration template (`default.conf.template`) explanation

The `default.confi.template` file you've provided is a configuration template for Nginx, which acts as the web server serving the React application.
When deploying to Google Cloud Run, this file helps configure Nginx to correctly serve your React application in a containerized environment.
Here's a breakdown of what this configuration does, particularly in the context of a single-page application (SPA) like most React apps:

## Listening on the Correct Port

```nginx
listen ${PORT} default_server;
listen [::]:${PORT} default_server;
```

- `listen ${PORT} default_server;`: This line tells Nginx to listen on the port number provided by the `PORT` environment variable, which Cloud Run automatically sets.
  This ensures that Nginx listens on the correct port assigned by Cloud Run.
- `listen [::]:${PORT} default_server;`: This is similar to the above but for IPv6 addresses.

Using `${PORT}` allows your Nginx server to be flexible and adapt to the port Cloud Run provides, which is crucial for the service to receive traffic in Cloud Run's environment.

## Serving the React application

```nginx
location / {
  root /usr/share/nginx/html;
  index index.html index.htm;
  try_files $uri $uri/ /index.html =404;
}
```

- `root /usr/share/nginx/html;`: Sets the root directory for requests, which is where Nginx looks for files to serve.
  In this case, it points to the location where the React build artifacts (`build` directory contents) are copied to inside the Docker container.
- `index index.html index.htm;`: Specifies that `index.html` or `index.htm` should be served as the index file when a directory is requested.
- `try_files $uri $uri/ /index.html =404;`: This line is crucial for single-page applications like React apps.
  It tries to serve the request as it is first (`$uri`), then tries to serve it as a directory (`$uri/`), and if neither is found, it falls back to serving `/index.html`.
  This behavior is essential for SPAs, where the routing is handled by JavaScript in the browser rather than by different server endpoints.
  If the requested resource isn't found, it falls back to `index.html`, allowing your React router to handle the route.
  The `=404` part ensures that if `/index.html` doesn't exist, a 404 error is returned.

## Summary

In summary, the `default.conf.template` file configures Nginx to dynamically listen on the correct port as dictated by Cloud Run and to serve your React application's static files correctly, with proper support for client-side routing.
This configuration ensures that users accessing different paths of your SPA are always served the `index.html` file, from which your React application takes over routing.
