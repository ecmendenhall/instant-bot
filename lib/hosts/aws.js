class AWS {

  constructor(environment={}) {
    this.environment = environment;
  }

  setup(callback) {
    callback();
  }

}

module.exports = AWS;
