
import GameObject from '../GameObject';
import GoalPhysics from './GoalPhysics';
import Collection from '../../shared/Collection';

export default class Goal extends GameObject {
  
  /* TODO: don't access cannon directly */
  constructor(cannonWorld) {
    var physics = new GoalPhysics();
    super(physics);

    this._cannonWorld = cannonWorld;
    this._scorers = new Collection();

    setInterval(this.tick.bind(this),30);
  }

  get scorers() { return this._scorers; }

  tick() {
    this._checkGoals();
  }

  _checkGoals() {

    this._scorers.forEach(function(key, scorer) {
      var result = [];

      /* TODO: don't access cannon directly */
      this._cannonWorld.narrowphase.getContacts(
        [this.physics._cannon], [scorer.physics._cannon],
        this._cannonWorld, result, [], [], []
      );
      if (result.length > 0) {
        this.fireEvent(Goal.SCORE, scorer);
      }
    }.bind(this));
  }

}

Goal.SCORE = 'SCORE';