using AutoClutch.Auto.Repo.Interfaces;
using AutoClutch.Auto.Service.Services;
using StuffFinder.Core.Interfaces;
using StuffFinder.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StuffFinder.Core.Services
{
    public class VoteService : Service<vote>, IVoteService
    {
        private readonly IRepository<vote> _voteRepository;
        
        private readonly IThingService _thingService;

        public VoteService(IRepository<vote> voteRepository, IThingService thingService)
            :base (voteRepository)
        {
            _voteRepository = voteRepository;

            _thingService = thingService;
        }

        public vote upVote(vote vote)
        {
            vote.value = 1;

            vote = addOrUpdateVote(vote);

            return vote;
        }

        public vote downVote(vote vote)
        {
            vote.value = -1;

            vote = addOrUpdateVote(vote);

            return vote;
        }

        private Models.vote addOrUpdateVote(vote vote)
        {
            // Has this user voted on this thing already.
            var previousVote = Get(filter: i => i.userName == vote.userName && i.thingId == vote.thingId).FirstOrDefault();

            // If there was a prevous vote then use the vote id 
            // and update.
            if (previousVote != null && previousVote.value != vote.value)
            {
                previousVote.value = vote.value;

                vote = Update(previousVote);
            }
            else if (previousVote == null)
            {
                vote = Add(vote);
            }

            vote.thing = vote.thing == null ? _thingService.Get(filter: i => i.thingId == vote.thingId).SingleOrDefault() : vote.thing;

            return vote;
        }


    }
}
