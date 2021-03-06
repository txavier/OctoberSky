﻿using AutoClutch.Auto.Repo.Interfaces;
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
        
        public VoteService(IRepository<vote> voteRepository)
            :base (voteRepository)
        {
            _voteRepository = voteRepository;
        }

        public vote upVote(vote vote, string loggedInUsername)
        {
            vote.value = 1;

            vote.userName = loggedInUsername;

            vote = addOrUpdateVote(vote);

            return vote;
        }

        public vote downVote(vote vote, string loggedInUsername)
        {
            vote.value = -1;

            vote.userName = loggedInUsername;

            vote = addOrUpdateVote(vote);

            return vote;
        }

        private Models.vote addOrUpdateVote(vote vote)
        {
            // Has this user voted on this thing already.
            var previousVote = 
                Get(filter: i => i.userName == vote.userName && i.thingId == vote.thingId && i.findingId == vote.findingId)
                .FirstOrDefault();

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

            return vote;
        }


    }
}
