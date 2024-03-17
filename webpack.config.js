module: {
    rules: [
      {
        test: /\.sol$/,
        use: [
          { loader: 'solc-loader' }
        ]
      }
    ]
  }
  