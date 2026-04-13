import { Component } from '@angular/core';

@Component({
  selector: 'app-scoreboard',
  standalone: true,
  imports: [],
  templateUrl: './scoreboard.component.html',
  styleUrl: './scoreboard.component.css'
})
export class ScoreboardComponent {

  isTiebreak: boolean = false;

  gamesForWinningSet: number = 6;
  setsForWinningMatch: number = 3;

  gamesPerSetTeamA: number[] = [];
  gamesPerSetTeamB: number[] = [];

  game: number = 1;
  set: number = 1;

  teamANumberOfSets: number = 0;
  teamBNumberOfSets: number = 0;

  teamANumberOfGamesThisSet: number = 0;
  teamBNumberOfGamesThisSet: number = 0;

  teamAPointsThisGame: number = 0;
  teamBPointsThisGame: number = 0;

  teamAScoreThisGame: number | string = 0;
  teamBScoreThisGame: number | string = 0;

  isDeuce: boolean = false;

  addPointToTeamA() {
    this.isDeucedGame();
    this.teamAPointsThisGame++;
    this.setTeamAScoreThisGame();
  }

  addPointToTeamB() {
    this.isDeucedGame();
    this.teamBPointsThisGame++;
    this.setTeamBScoreThisGame();
  }

  setTeamAScoreThisGame() {
    if (this.teamAPointsThisGame > 3) {
      if (this.isDeuce) {
        this.checkDeuce();
      }
      else {
        this.closeCurrentGame();
        this.teamANumberOfGamesThisSet++;
      }        
    } else {
      switch (this.teamAPointsThisGame) {
        case 0:
          this.teamAScoreThisGame = 0;
          break;
        case 1:
          this.teamAScoreThisGame = 15;
          break;
        case 2:
          this.teamAScoreThisGame = 30;
          break;
        case 3:
          this.teamAScoreThisGame = 40;
          break;
      }
    }
    
  }

  setTeamBScoreThisGame() {
    if (this.teamBPointsThisGame > 3) {
      if (this.isDeuce) {
        this.checkDeuce();
      }
      else {
        this.closeCurrentGame();
        this.teamBNumberOfGamesThisSet++;
      }
    } else {
    switch (this.teamBPointsThisGame) {
      case 0:
        this.teamBScoreThisGame = 0;
        break;
      case 1:
        this.teamBScoreThisGame = 15;
        break;
      case 2:
        this.teamBScoreThisGame = 30;
        break;
      case 3:
        this.teamBScoreThisGame = 40;
        break;
      }
    }
  }

  checkDeuce() {
    switch (this.teamAPointsThisGame - this.teamBPointsThisGame) {
      case 0:
        this.teamAScoreThisGame = 40;
        this.teamBScoreThisGame = 40;
        break;
      case 1:
        this.teamAScoreThisGame = 'A';
        break;
      case -1:
        this.teamBScoreThisGame = 'A';
        break;
      case 2:
        // team A wins the set
        this.teamANumberOfGamesThisSet++;
        this.closeCurrentGame();
        break;
      case -2:
        // team B wins the set
        this.teamBNumberOfGamesThisSet++;
        this.closeCurrentGame();
        break;
    }
  }

  isDeucedGame() {
    if ((this.teamAPointsThisGame >= 3 && this.teamBPointsThisGame >= 3) && (this.teamAPointsThisGame === this.teamBPointsThisGame)) {
      this.isDeuce = true;
    };
  }

  closeCurrentGame() {
    this.isDeuce = false;
    this.teamAPointsThisGame = 0;
    this.teamBPointsThisGame = 0;
    this.teamAScoreThisGame = 0;
    this.teamBScoreThisGame = 0;
    this.game++;
  }

  closeCurrentSet() {
    this.gamesPerSetTeamA.push(this.teamANumberOfGamesThisSet);
    this.gamesPerSetTeamB.push(this.teamBNumberOfGamesThisSet);
    if (this.teamANumberOfGamesThisSet > this.teamBNumberOfGamesThisSet) {
      this.teamANumberOfSets++;
    } else {
      this.teamBNumberOfSets++;
    }
    this.teamANumberOfGamesThisSet = 0;
    this.teamBNumberOfGamesThisSet = 0;
    this.set++;
    this.game = 1;
    this.isTiebreak = false;
  }

  checkIfSetIsOver() {
    if ((this.teamANumberOfGamesThisSet >= this.gamesForWinningSet || this.teamBNumberOfGamesThisSet >= this.gamesForWinningSet) && (Math.abs(this.teamANumberOfGamesThisSet - this.teamBNumberOfGamesThisSet)) >= 2) {
      this.closeCurrentSet();
    }
    else if (this.teamANumberOfGamesThisSet === this.gamesForWinningSet && this.teamBNumberOfGamesThisSet === this.gamesForWinningSet) {
      // tiebreak
      this.isTiebreak = true;
    }
  }


}
