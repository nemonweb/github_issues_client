module.exports = {
  "extends": "stylelint-config-standard",
  "rules": {
    "declaration-block-trailing-semicolon": "never",
    "selector-pseudo-class-no-unknown": [
      true,
      { "ignorePseudoClasses": ["global", "local"] }
    ]
  }
}
