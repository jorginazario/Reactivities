using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;

namespace Application.Activities
{
    public class Create
    {
        public class Command : IRequest // queries return data and commands do not
        {
            public Activity Activity { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                this._context = context;

            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                _context.Activities.Add(request.Activity); 
                //entity framework is tracking the fact that we're adding an activity to our activities 
                // inside our context in memory. The only time that we make a change is when we go back and save changes
                await _context.SaveChangesAsync();

                return Unit.Value; // we return so that the API controller knows this code has finished
            }
        }
    }
}