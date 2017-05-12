class AWS {

  constructor(environment={}) {
    this.environment = environment;
  }

  setup(callback) {
    return callback();
  }

}

module.exports = AWS;
