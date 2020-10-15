var givenInputs = [];
var length = 0;

window.FakeTerminal.command.h2p = function (instance) {
  //  Extend the base command
  window.FakeTerminal.command.apply(this, arguments);

  var base = this;

  base.info = function () {
    return {
      private: false,
      description: "This command shows how to start the game.",
    };
  };

  base.execute = function () {
    instance.output.write(
      "<comment>Welcome!</comment>\n<info>Type in 'play' and hit enter or use the menu buttons on the bottom to get started with the game!</info>\n<muted>To see more info about the game, type in about, and hit enter.</muted>\n<muted>To see more other terminal commands, type in help, and hit enter.</muted>\n<question>To see this again, type h2p and hit enter.</question>"
    );
    base.deferred.resolve();
    return base.deferred.promise();
  };

  return base;
};

window.FakeTerminal.command.about = function (instance) {
  //  Extend the base command
  window.FakeTerminal.command.apply(this, arguments);

  var base = this;

  base.info = function () {
    return {
      private: false,
      description: "This command explains more about the game.",
    };
  };

  base.execute = function () {
    writeLine(instance);
    write(
      `Hi! I'm Jason, and I made this game in about 3 days for a project in my Latin III class. \n\nIf you're interested, the code will eventually be on my GitHub (https://jasonaa.me/github). \n\nTo build this, I used HTML/CSS/JS, and to supplement that I also used jQuery, Font Awesome, FakeTerminal, and Google Fonts. \n\nIt is being hosted on repl.it, but I may switch over to Vercel in the future.`,
      instance
    );
    base.deferred.resolve();
    return base.deferred.promise();
  };

  return base;
};

window.FakeTerminal.command.man = function () {
  var base = this;
  window.FakeTerminal.command.help.apply(this, arguments);
  base.info = function () {
    return {
      private: true,
      description: "Alias of help",
    };
  };
  return this;
};

window.FakeTerminal.command.whoami = function () {
  var base = this;
  window.FakeTerminal.command.help.apply(this, arguments);
  base.info = function () {
    return {
      private: true,
      description: "Alias of help",
    };
  };
  return this;
};

window.FakeTerminal.command.sleep = function () {
  var base = this;
  window.FakeTerminal.command.help.apply(this, arguments);
  base.info = function () {
    return {
      private: true,
      description: "Alias of help",
    };
  };
  return this;
};

window.FakeTerminal.command.play = function (instance) {
  //  Extend the base command
  window.FakeTerminal.command.apply(this, arguments);

  var base = this;

  base.info = function () {
    return {
      private: false,
      description: "This command starts the game - Hercules and the Lion!",
    };
  };

  base.terminate = function () {
    actions = defaultActions; // restoring the default state of the buttons
    renderButtons(); // re-rendering the buttons
  };

  base.execute = function () {
    writeLine(instance);
    write("Hercules Labors 1 - Hercules and the Lion\n", instance);
    writeLine(instance);

    write("Eurystheus: Hello Hercules.", instance);
    buttonThing(["Hercules: Why have you sent for me?", "Hercules: *silence*"]);

    instance.input.request().done(function (value) {
      write(actions[value]["label"], instance);
      write(
        "Eurystheus: The gods and I would like you to complete a few tasks.",
        instance
      );
      buttonThing([
        "Hercules: Why me?",
        "Hercules: No.",
        "Hercules: Fine. Let's just get this over with.",
      ]);
      instance.input.request().done(function (value) {
        write(actions[value]["label"], instance);
      });

      // ending the game
      base.terminate();
      base.deferred.resolve(); // ending the command
    });

    // requestInput(instance, base)
    // instance.input.request().then(text => write(text, instance).then(base.deferred.resolve()))

    return base.deferred.promise();
  };

  return base;
};

function buttonThing(responses) {
  actions = [];
  for (res in responses) {
    actions.push({ action: res, label: responses[res] });
  }
  length = responses.length;
  while (actions.length != MAX_BUTTONS_NO) {
    actions.push({ action: "", label: "" });
  }
  renderButtons();
}

function writeYellow(text, instance) {
  return instance.output.write(`<comment>${text}</comment>`);
}

function writeGreen(text, instance) {
  return instance.output.write(`<info>${text}</info>`);
}

function writeBlue(text, instance) {
  return instance.output.write(`<question>${text}</question>`);
}

function writeRed(text, instance) {
  return instance.output.write(`<error>${text}</error>`);
}

function writeGray(text, instance) {
  return instance.output.write(`<muted>${text}</muted>`);
}

function write(text, instance) {
  return instance.output.write(text);
}

function writeLine(instance) {
  return instance.output.write("<line></line>");
}
