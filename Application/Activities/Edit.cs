using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using Domain;
using MediatR;
using Persistence;

namespace Application.Activities
{
    public class Edit
    {
        public class Command : IRequest
        {
            public Activity Activity { get; set; }
        }

        public class Handler : IRequestHandler<Command> //here we specify we want to do a COMMAND to tell the database to update
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper mapper) // the data context is basically the database itself - we're using entity framework to get it for us
            {
                this._mapper = mapper;
                this._context = context;

            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                // get activity first, then update it
                var activity = await _context.Activities.FindAsync(request.Activity.Id);

                //activity.Title = request.Activity.Title ?? activity.Title; //if the request does not have a TITLE then leave as is
                _mapper.Map(request.Activity, activity); // this updates all of the fields in Activity that have changed

                await _context.SaveChangesAsync();

                return Unit.Value; // not returning anything because this is a nothing object
            }
        }
    }
}