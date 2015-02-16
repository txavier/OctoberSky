using System;
using System.Threading.Tasks;
using Microsoft.Owin;
using Owin;
using System.Web.Http;
using Microsoft.Owin.Security.OAuth;
using StuffFinder.ResourceServer.App_Start;
using StuffFinder.Core.Models;
using System.Runtime.Serialization;

[assembly: OwinStartup(typeof(StuffFinder.ResourceServer.Startup))]

namespace StuffFinder.ResourceServer
{
    public class Startup
    {
        public static OAuthBearerAuthenticationOptions OAuthBearerOptions { get; private set; }
        
        public void Configuration(IAppBuilder app)
        {
            HttpConfiguration config = new HttpConfiguration();

            ConfigureOAuth(app);

            WebApiConfig.Register(config);
            app.UseCors(Microsoft.Owin.Cors.CorsOptions.AllowAll);
            app.UseWebApi(config);

            config.Formatters.JsonFormatter.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore;

            // Remove the xml formatter we are going full json.
            //config.Formatters.Remove(config.Formatters.XmlFormatter);
        }

        private void ConfigureOAuth(IAppBuilder app)
        {
            OAuthBearerOptions = new OAuthBearerAuthenticationOptions();
            //Token Consumption
            app.UseOAuthBearerAuthentication(OAuthBearerOptions);
        }
    }
}
