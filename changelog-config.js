module.exports = {
  writerOpts: {
    transform: (commit, context) => {
      const issues = []
      if (commit.type === 'feat') {
        commit.type = '✨ Features'
      } else if (commit.type === 'fix') {
        commit.type = '🐛 Bug Fixes'
      } else if (commit.type === 'perf') {
        commit.type = '⚡ Performance Improvements'
      } else if (commit.type === 'revert' || commit.revert) {
        commit.type = '⏪ Reverts'
      } else {
        return
      }
      if (typeof commit.hash === 'string') {
        commit.shortHash = commit.hash.substring(0, 7)
      }

      if (typeof commit.subject === 'string') {
        let url = context.repository
          ? `${context.host}/${context.owner}/${context.repository}`
          : context.repoUrl
        if (url) {
          url = `${url}/issues/`
          // Issue URLs.
          commit.subject = commit.subject.replace(/#([0-9]+)/g, (_, issue) => {
            issues.push(issue)
            return `[#${issue}](${url}${issue})`
          })
        }
        if (context.host) {
          // User URLs.
          commit.subject = commit.subject.replace(
            /\B@([a-z0-9](?:-?[a-z0-9/]){0,38})/g,
            (_, username) => {
              if (username.includes('/')) {
                return `@${username}`
              }

              return `[@${username}](${context.host}/${username})`
            }
          )
        }
      }

      // remove references that already appear in the subject
      commit.references = commit.references.filter(reference => {
        if (issues.indexOf(reference.issue) === -1) {
          return true
        }

        return false
      })

      return commit
    }
  }
}
