/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-require-imports */
const github = require('@actions/github');

async function run() {
  try {
    const token = process.env.GITHUB_TOKEN;
    if (!token) {
      throw new Error('GITHUB_TOKEN is not provided');
    }

    const octokit = github.getOctokit(token);
    const context = github.context;

    const pr = context.payload.pull_request;
    const repository = context.payload.repository;

    if (!pr) {
      throw new Error('This action only runs on pull request events.');
    }

    await octokit.rest.issues.addAssignees({
      owner: repository.owner.login,
      repo: repository.name,
      issue_number: pr.number,
      assignees: [pr.user.login],
    });

    console.log(`Successfully assigned ${pr.user.login} to PR #${pr.number}`);
  } catch (error) {
    console.error('Failed to assign PR creator:', error.message);
    process.exit(1);
  }
}

run();
