using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Activities;
using Domain;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class ActivitiesController : BaseApiController
    {
        // ################################### List.cs
        [HttpGet] 
        public async Task<ActionResult<List<Activity>>> GetActivities()
        {
            return await Mediator.Send(new List.Query());
        }


        // ################################### Details.cs
        [HttpGet("{id}")] // activities/id
        public async Task<ActionResult<Activity>> GetActivity(Guid id)
        {
            return await Mediator.Send(new Details.Query{Id = id});
        }

        // ################################### Create.cs
        [HttpPost]
        public async Task<IActionResult> CreateActivity(Activity activity) //we're not returning anything - return OK / Not Found / Bad Request
        {
            return Ok(await Mediator.Send(new Create.Command {Activity = activity}));
        }

        // #################################### Edit.cs
        [HttpPut("{id}")]
        public async Task<IActionResult> EditActivity(Guid id, Activity activity) // if our new activity in the body of the request has changes compared to the one in the data context then update the datacontext
        {
            activity.Id = id; // assign our activity the id from the browser because it is not included in the body of the client request
            return Ok(await Mediator.Send(new Edit.Command{Activity = activity}));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteActivity(Guid id)
        {
            return Ok(await Mediator.Send(new Delete.Command{Id = id}));
        }


    }
}