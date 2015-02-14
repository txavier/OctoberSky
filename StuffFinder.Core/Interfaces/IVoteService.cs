using AutoClutch.Auto.Service.Interfaces;
using StuffFinder.Core.Models;
using System;
namespace StuffFinder.Core.Interfaces
{
    public interface IVoteService : IService<vote>
    {
        StuffFinder.Core.Models.vote downVote(StuffFinder.Core.Models.vote vote);
        StuffFinder.Core.Models.vote upVote(StuffFinder.Core.Models.vote vote);
    }
}
