using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Net;
using System.Web;

namespace MyApp.Services
{
    public class ReactRenderService : IReactRenderService
    {
        const string RENDER_SERVICE_ENDPOINT = "http://localhost:10054/";
        const string RENDER_SERVICE_TOSTRING_PATH = "renderToString/";
        const string RENDER_SERVICE_TOSTATIC_PATH = "renderToStaticMarkup/";

        public HtmlString RenderToString(string component, object model)
        {
            return Render(RENDER_SERVICE_TOSTRING_PATH, component, model);
        }

        public HtmlString RenderToStaticMarkup(string component, object model)
        {
            return Render(RENDER_SERVICE_TOSTATIC_PATH, component, model);
        }

        private HtmlString Render(string servicePath, string component, object model)
        {
            var request = WebRequest.Create(string.Format("{0}{1}{2}", RENDER_SERVICE_ENDPOINT, servicePath, component));
            request.Method = "POST";
            request.ContentType = "application/json; charset=utf-8";
            request.Timeout = 1000;

            try
            {
                using (var sw = new StreamWriter(request.GetRequestStream()))
                {
                    var serializedModel = JsonConvert.SerializeObject(model);
                    if (serializedModel == null || serializedModel == string.Empty)
                    {
                        serializedModel = "{}";
                    }

                    sw.Write(serializedModel);
                    sw.Flush();
                }

                var response = request.GetResponse();
                using (var sr = new StreamReader(response.GetResponseStream()))
                {
                    var html = sr.ReadToEnd();

                    return new HtmlString(html);
                }
            }
            catch (Exception ex)
            {
                Debug.WriteLine(ex);
            }

            return new HtmlString("");
        }
    }
}
