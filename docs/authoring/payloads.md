The different event types that trigger execution of a skill make different
information available to the skill via the file pointed to by the
`ATOMIST_PAYLOAD` environment variable. The following sections give examples of
the JSON object make available in the contents of the `ATOMIST_PAYLOAD` file for
the different trigger event types.

## GitHub > branch

```json
{
	"data": {
		"Branch": [
			{
				"commit": {
					"author": {
						"login": "cdupuis",
						"person": {
							"chatId": {
								"chatTeam": {
									"id": "T29E48P34"
								},
								"screenName": "cd"
							},
							"emails": [
								{
									"address": "cd@atomist.com"
								}
							],
							"forename": "Christian",
							"gitHubId": {
								"login": "cdupuis"
							},
							"name": "Christian Dupuis",
							"surname": "Dupuis"
						}
					},
					"committer": {
						"login": "cdupuis",
						"person": {
							"chatId": {
								"chatTeam": {
									"id": "T29E48P34"
								},
								"screenName": "cd"
							},
							"emails": [
								{
									"address": "cd@atomist.com"
								}
							],
							"forename": "Christian",
							"gitHubId": {
								"login": "cdupuis"
							},
							"name": "Christian Dupuis",
							"surname": "Dupuis"
						}
					},
					"message": "npm license usage update\n\n[atomist:generated]\n[atomist-skill:atomist/npm-license-usage-skill]",
					"sha": "8f7a4470c94bef1f63f8b96f65a44161ab02b68f"
				},
				"name": "master",
				"repo": {
					"channels": [
						{
							"channelId": "CUCHNG75H",
							"name": "github-auto-rebase-skill",
							"team": {
								"id": "T29E48P34"
							}
						}
					],
					"defaultBranch": "master",
					"name": "github-auto-rebase-skill",
					"org": {
						"owner": "atomist-skills",
						"ownerType": "organization",
						"provider": {
							"apiUrl": "https://api.github.com/",
							"providerId": "624642c2-a2c4-4cfb-b1b7-8752739dcfb9",
							"providerType": "github_com",
							"url": "https://github.com/"
						}
					},
					"owner": "atomist-skills",
					"url": "https://github.com/atomist-skills/github-auto-rebase-skill"
				},
				"timestamp": "2020-08-25T15:08:31.456Z"
			}
		]
	},
	"extensions": {
		"operationName": "onBranch",
		"query_id": "28ac7216-b327-4914-9c95-22542c01bd7f",
		"correlation_id": "88e6b5b8-83cd-4800-b5dc-86a82dd78433",
		"request_id": "9b8f66c95bb0b4197e8f2d447ac78c7e"
	}
}
```

## GitHub > commit check

```json
{
	"data": {
		"CheckRun": [
			{
				"startedAt": "2020-08-25T15:18:27Z",
				"conclusion": "success",
				"checkRunId": "1027213028",
				"checkSuite": {
					"action": "completed",
					"appSlug": "atomist",
					"commit": {
						"author": {
							"login": "cdupuis",
							"person": {
								"chatId": {
									"chatTeam": {
										"id": "T29E48P34"
									},
									"screenName": "cd"
								},
								"emails": [
									{
										"address": "cd@atomist.com"
									}
								],
								"forename": "Christian",
								"gitHubId": {
									"login": "cdupuis"
								},
								"name": "Christian Dupuis",
								"surname": "Dupuis"
							}
						},
						"committer": {
							"login": "cdupuis",
							"person": {
								"chatId": {
									"chatTeam": {
										"id": "T29E48P34"
									},
									"screenName": "cd"
								},
								"emails": [
									{
										"address": "cd@atomist.com"
									}
								],
								"forename": "Christian",
								"gitHubId": {
									"login": "cdupuis"
								},
								"name": "Christian Dupuis",
								"surname": "Dupuis"
							}
						},
						"message": "npm license usage update\n\n[atomist:generated]\n[atomist-skill:atomist/npm-license-usage-skill]",
						"repo": {
							"channels": [
								{
									"channelId": "CUCHNG75H",
									"name": "github-auto-rebase-skill",
									"team": {
										"id": "T29E48P34"
									}
								}
							],
							"defaultBranch": "master",
							"name": "github-auto-rebase-skill",
							"org": {
								"owner": "atomist-skills",
								"ownerType": "organization",
								"provider": {
									"apiUrl": "https://api.github.com/",
									"providerId": "624642c2-a2c4-4cfb-b1b7-8752739dcfb9",
									"providerType": "github_com",
									"url": "https://github.com/"
								}
							},
							"owner": "atomist-skills",
							"url": "https://github.com/atomist-skills/github-auto-rebase-skill"
						},
						"sha": "8f7a4470c94bef1f63f8b96f65a44161ab02b68f"
					},
					"conclusion": "success",
					"status": "completed",
					"timestamp": "2020-08-25T15:23:22.915Z"
				},
				"name": "npm-audit-skill",
				"detailsUrl": "https://go.atomist.com/log/T29E48P34/c73a33d8-ec53-4d7b-96e7-715ba1465280.GAfPmMYYqeYAfUfefgTiC",
				"htmlUrl": "https://github.com/atomist-skills/github-auto-rebase-skill/runs/1027213028",
				"completedAt": "2020-08-25T15:23:22Z",
				"status": "completed",
				"url": "https://api.github.com/repos/atomist-skills/github-auto-rebase-skill/check-runs/1027213028",
				"outputTitle": "npm audit",
				"action": "completed"
			}
		]
	},
	"extensions": {
		"operationName": "onCheckRun",
		"query_id": "e59825b5-260c-455b-a7a4-9ea570abfc81",
		"correlation_id": "ac1a8e52-693a-4b50-96ba-7dc6554b1834",
		"request_id": "07b53f5038f6e8669e1f76b7f6cb2d34"
	}
}
```

## GitHub > commit status

```json
{
	"data": {
		"Status": [
			{
				"commit": {
					"message": "Version: increment after 2.1.2 release\n\n[atomist:generated]",
					"pushes": [
						{
							"branch": "master"
						}
					],
					"repo": {
						"channels": [
							{
								"channelId": "CUCHNG75H",
								"name": "github-auto-rebase-skill",
								"team": {
									"id": "T29E48P34"
								}
							}
						],
						"defaultBranch": "master",
						"name": "github-auto-rebase-skill",
						"org": {
							"owner": "atomist-skills",
							"ownerType": "organization",
							"provider": {
								"apiUrl": "https://api.github.com/",
								"providerId": "624642c2-a2c4-4cfb-b1b7-8752739dcfb9",
								"providerType": "github_com",
								"url": "https://github.com/"
							}
						},
						"owner": "atomist-skills",
						"url": "https://github.com/atomist-skills/github-auto-rebase-skill"
					},
					"sha": "0a247d6bad2271c854e00fa469d5395a7f766859",
					"statuses": [
						{
							"context": "sdm/atomist/atomist-web-sdm",
							"description": "@atomist/atomist-web-sdm goals: all succeeded",
							"state": "success"
						}
					]
				},
				"context": "sdm/atomist/atomist-web-sdm",
				"description": "@atomist/atomist-web-sdm goals: all succeeded",
				"state": "success",
				"targetUrl": "https://app.atomist.com/workspace/T29E48P34/goalset/900d29a1-de97-455e-a304-32654aaf23d9"
			}
		]
	},
	"extensions": {
		"operationName": "onStatus",
		"query_id": "c1c3ec3b-3d86-4425-9bbe-3fb6ec5c0907",
		"correlation_id": "8a297725-4504-407b-b33e-5665990d9eee",
		"request_id": "6db01b660016a14623cf5dd82df43790"
	}
}
```

## GitHub > issue or pull request comment

```json
{
	"data": {
		"Comment": [
			{
				"body": "Pull request auto merged:\n\n* No reviews\n* 1 successful check\n\n<!--\n  [atomist:generated]\n  [atomist-skill:atomist/github-auto-merge-skill]\n  [atomist-correlation-id:79848124-f09f-405b-87fe-bd7e96dd4a03.INxc6G8beCHhk3ouCFdri]\n-->",
				"by": {
					"login": "cdupuis",
					"person": {
						"chatId": {
							"chatTeam": {
								"id": "T29E48P34"
							},
							"screenName": "cd"
						},
						"emails": [
							{
								"address": "cd@atomist.com"
							}
						],
						"forename": "Christian",
						"gitHubId": {
							"login": "cdupuis"
						},
						"name": "Christian Dupuis",
						"surname": "Dupuis"
					}
				},
				"gitHubId": "680084298",
				"issue": null,
				"pullRequest": {
					"labels": [
						{
							"name": "auto-merge-method:merge"
						},
						{
							"name": "auto-branch-delete:on-close"
						},
						{
							"name": "auto-merge:on-check-success"
						}
					],
					"assignees": [],
					"merged": true,
					"number": 28,
					"state": "closed",
					"title": "npm update changes",
					"author": {
						"login": "cdupuis",
						"person": {
							"chatId": {
								"chatTeam": {
									"id": "T29E48P34"
								},
								"screenName": "cd"
							},
							"emails": [
								{
									"address": "cd@atomist.com"
								}
							],
							"forename": "Christian",
							"gitHubId": {
								"login": "cdupuis"
							},
							"name": "Christian Dupuis",
							"surname": "Dupuis"
						}
					},
					"reviews": [],
					"repo": {
						"channels": [
							{
								"channelId": "CUCHNG75H",
								"name": "github-auto-rebase-skill",
								"team": {
									"id": "T29E48P34"
								}
							}
						],
						"defaultBranch": "master",
						"name": "github-auto-rebase-skill",
						"org": {
							"owner": "atomist-skills",
							"ownerType": "organization",
							"provider": {
								"apiUrl": "https://api.github.com/",
								"providerId": "624642c2-a2c4-4cfb-b1b7-8752739dcfb9",
								"providerType": "github_com",
								"url": "https://github.com/"
							}
						},
						"owner": "atomist-skills",
						"url": "https://github.com/atomist-skills/github-auto-rebase-skill"
					},
					"reviewers": []
				},
				"timestamp": "2020-08-25T15:08:32Z"
			}
		]
	},
	"extensions": {
		"operationName": "onComment",
		"query_id": "66df106a-1fda-4b8b-adbf-ccf3f195d36d",
		"correlation_id": "153a5a6b-caa4-4652-84df-c9e65be6ed5e",
		"request_id": "156b1edb5069df8e4698eb6f808d05fd"
	}
}
```

## GitHub > deleted branch

```json
{
	"data": {
		"DeletedBranch": [
			{
				"commit": {
					"author": {
						"login": "cdupuis",
						"person": {
							"chatId": {
								"chatTeam": {
									"id": "T29E48P34"
								},
								"screenName": "cd"
							},
							"emails": [
								{
									"address": "cd@atomist.com"
								}
							],
							"forename": "Christian",
							"gitHubId": {
								"login": "cdupuis"
							},
							"name": "Christian Dupuis",
							"surname": "Dupuis"
						}
					},
					"committer": {
						"login": "cdupuis",
						"person": {
							"chatId": {
								"chatTeam": {
									"id": "T29E48P34"
								},
								"screenName": "cd"
							},
							"emails": [
								{
									"address": "cd@atomist.com"
								}
							],
							"forename": "Christian",
							"gitHubId": {
								"login": "cdupuis"
							},
							"name": "Christian Dupuis",
							"surname": "Dupuis"
						}
					},
					"message": "npm update changes\n\n[atomist:generated]\n[atomist-skill:atomist/npm-audit-skill]",
					"sha": "9d882381e1d982f86376c4c101c62059f2dbe3a2"
				},
				"name": "atomist/npm-update-master",
				"repo": {
					"channels": [
						{
							"channelId": "CUCHNG75H",
							"name": "github-auto-rebase-skill",
							"team": {
								"id": "T29E48P34"
							}
						}
					],
					"defaultBranch": "master",
					"name": "github-auto-rebase-skill",
					"org": {
						"owner": "atomist-skills",
						"ownerType": "organization",
						"provider": {
							"apiUrl": "https://api.github.com/",
							"providerId": "624642c2-a2c4-4cfb-b1b7-8752739dcfb9",
							"providerType": "github_com",
							"url": "https://github.com/"
						}
					},
					"owner": "atomist-skills",
					"url": "https://github.com/atomist-skills/github-auto-rebase-skill"
				},
				"timestamp": "2020-08-25T15:08:34.132Z"
			}
		]
	},
	"extensions": {
		"operationName": "onDeletedBranch",
		"query_id": "ba2bce53-3995-423b-94cf-806c91f0e463",
		"correlation_id": "2fddd0ec-def7-47ce-973c-b79441ad5b3d",
		"request_id": "e75ecd5559232d5b94bd89e15607def9"
	}
}
```

## GitHub > issue

```json
{
	"data": {
		"Issue": [
			{
				"assignees": [
					{
						"login": "cdupuis",
						"person": {
							"chatId": {
								"chatTeam": {
									"id": "T29E48P34"
								},
								"screenName": "cd"
							},
							"emails": [
								{
									"address": "cd@atomist.com"
								}
							],
							"forename": "Christian",
							"gitHubId": {
								"login": "cdupuis"
							},
							"name": "Christian Dupuis",
							"surname": "Dupuis"
						}
					}
				],
				"updatedAt": "2020-03-05T19:17:11Z",
				"number": 1,
				"createdAt": "2020-03-05T03:26:10Z",
				"state": "closed",
				"title": "PR branch not rebased when base branch updated",
				"openedBy": {
					"login": "jrday",
					"person": {
						"chatId": {
							"chatTeam": {
								"id": "T29E48P34"
							},
							"screenName": "jrday"
						},
						"emails": [
							{
								"address": "jryanday@gmail.com"
							}
						],
						"forename": "Ryan",
						"gitHubId": {
							"login": "jrday"
						},
						"name": "Ryan Day",
						"surname": "Day"
					}
				},
				"repo": {
					"channels": [
						{
							"channelId": "CUCHNG75H",
							"name": "github-auto-rebase-skill",
							"team": {
								"id": "T29E48P34"
							}
						}
					],
					"defaultBranch": "master",
					"name": "github-auto-rebase-skill",
					"org": {
						"owner": "atomist-skills",
						"ownerType": "organization",
						"provider": {
							"apiUrl": "https://api.github.com/",
							"providerId": "624642c2-a2c4-4cfb-b1b7-8752739dcfb9",
							"providerType": "github_com",
							"url": "https://github.com/"
						}
					},
					"owner": "atomist-skills",
					"url": "https://github.com/atomist-skills/github-auto-rebase-skill"
				},
				"body": "Scenario:\r\n\r\n1. Created https://github.com/fauxryan/chambray/pull/113 (branch: `app-update`)\r\n2. Pushed a change to `master` in a different file than the PR changes\r\n4. `app-update` branch not rebased\r\n\r\nSkill log messages:\r\n> Pull request fauxryan/chambray#113 not opened. Ignoring...\r\n...\r\n> Pull request fauxryan/chambray#113 rebase failed because force push errored\r\n...\r\n> No open pull request that needs rebasing against branch app-update\r\n\r\nBut `master` is the base branch of `app-update`, so it was expected to be rebased."
			}
		]
	},
	"extensions": {
		"operationName": "onIssue",
		"query_id": "4a6a2360-f3fa-40d9-a707-2e81b056d90b",
		"correlation_id": "3afe4872-ad3b-460f-87e2-aaef6b589aa1",
		"request_id": "3cff55980434c9fa905c20aec8156de9"
	}
}
```

## GitHub > new repository

```json
{
	"data": {
		"Repo": [
			{
				"channels": [
					{
						"channelId": "CUCHNG75H",
						"name": "github-auto-rebase-skill",
						"team": {
							"id": "T29E48P34"
						}
					}
				],
				"defaultBranch": "master",
				"name": "github-auto-rebase-skill",
				"org": {
					"owner": "atomist-skills",
					"ownerType": "organization",
					"provider": {
						"apiUrl": "https://api.github.com/",
						"providerId": "624642c2-a2c4-4cfb-b1b7-8752739dcfb9",
						"providerType": "github_com",
						"url": "https://github.com/"
					}
				},
				"owner": "atomist-skills",
				"url": "https://github.com/atomist-skills/github-auto-rebase-skill"
			}
		]
	},
	"extensions": {
		"operationName": "onNewRepo",
		"query_id": "d88ba7a7-2f97-4d96-b564-ba1d983ca790",
		"correlation_id": "2225d0eb-2889-4470-93f3-d17fdaf7bc12",
		"request_id": "26be1543904d0a466468778818b65ae0"
	}
}
```

## GitHub > pull request

```json
{
	"data": {
		"PullRequest": [
			{
				"labels": [
					{
						"name": "auto-merge-method:merge"
					},
					{
						"name": "auto-branch-delete:on-close"
					},
					{
						"name": "auto-merge:on-check-success"
					}
				],
				"updatedAt": "2020-08-25T15:08:33Z",
				"number": 28,
				"createdAt": "2020-08-25T15:08:23Z",
				"title": "npm update changes",
				"author": {
					"login": "cdupuis",
					"person": {
						"chatId": {
							"chatTeam": {
								"id": "T29E48P34"
							},
							"screenName": "cd"
						},
						"emails": [
							{
								"address": "cd@atomist.com"
							}
						],
						"forename": "Christian",
						"gitHubId": {
							"login": "cdupuis"
						},
						"name": "Christian Dupuis",
						"surname": "Dupuis"
					}
				},
				"head": {
					"author": {
						"login": "cdupuis",
						"person": {
							"chatId": {
								"chatTeam": {
									"id": "T29E48P34"
								},
								"screenName": "cd"
							},
							"emails": [
								{
									"address": "cd@atomist.com"
								}
							],
							"forename": "Christian",
							"gitHubId": {
								"login": "cdupuis"
							},
							"name": "Christian Dupuis",
							"surname": "Dupuis"
						}
					},
					"committer": {
						"login": "cdupuis",
						"person": {
							"chatId": {
								"chatTeam": {
									"id": "T29E48P34"
								},
								"screenName": "cd"
							},
							"emails": [
								{
									"address": "cd@atomist.com"
								}
							],
							"forename": "Christian",
							"gitHubId": {
								"login": "cdupuis"
							},
							"name": "Christian Dupuis",
							"surname": "Dupuis"
						}
					},
					"message": "npm update changes\n\n[atomist:generated]\n[atomist-skill:atomist/npm-audit-skill]",
					"sha": "9d882381e1d982f86376c4c101c62059f2dbe3a2"
				},
				"mergeStatus": null,
				"reviews": [],
				"action": "labeled",
				"repo": {
					"channels": [
						{
							"channelId": "CUCHNG75H",
							"name": "github-auto-rebase-skill",
							"team": {
								"id": "T29E48P34"
							}
						}
					],
					"defaultBranch": "master",
					"name": "github-auto-rebase-skill",
					"org": {
						"owner": "atomist-skills",
						"ownerType": "organization",
						"provider": {
							"apiUrl": "https://api.github.com/",
							"providerId": "624642c2-a2c4-4cfb-b1b7-8752739dcfb9",
							"providerType": "github_com",
							"url": "https://github.com/"
						}
					},
					"owner": "atomist-skills",
					"url": "https://github.com/atomist-skills/github-auto-rebase-skill"
				},
				"base": {
					"author": {
						"login": "cdupuis",
						"person": {
							"chatId": {
								"chatTeam": {
									"id": "T29E48P34"
								},
								"screenName": "cd"
							},
							"emails": [
								{
									"address": "cd@atomist.com"
								}
							],
							"forename": "Christian",
							"gitHubId": {
								"login": "cdupuis"
							},
							"name": "Christian Dupuis",
							"surname": "Dupuis"
						}
					},
					"committer": {
						"login": "cdupuis",
						"person": {
							"chatId": {
								"chatTeam": {
									"id": "T29E48P34"
								},
								"screenName": "cd"
							},
							"emails": [
								{
									"address": "cd@atomist.com"
								}
							],
							"forename": "Christian",
							"gitHubId": {
								"login": "cdupuis"
							},
							"name": "Christian Dupuis",
							"surname": "Dupuis"
						}
					},
					"message": "Auto-merge pull request #27 from atomist-skills/github-auto-rebase-skill\n\nnpm update changes\n    \nPull request auto merged:\n\n* No reviews\n* 1 successful check",
					"sha": "795bc8b75b8961d3a8796e50312452b3a43e92ff"
				},
				"branch": null,
				"body": "This pull request updates the following 4 dependencies:\n\n### Development Dependencies\n\n* `@types/lodash` > _4.14.160_\n* `@typescript-eslint/eslint-plugin` > _3.10.1_\n* `@typescript-eslint/parser` > _3.10.1_\n* `lint-staged` > _10.2.12_\n\t\t\n\n---\n\nFiles changed:\n * `package-lock.json`\n * `package.json`\n\n<!--\n  [atomist:generated]\n  [atomist-skill:atomist/npm-audit-skill]\n  [atomist-correlation-id:aea5a99d-c6f7-4532-aea1-4e61856c6561.CbfscdpMal65SyGi2uTQN]\n  [atomist-diff:470bd5f4829ca57d452c2fb7004432df34e419edb8ab98aeb34c8d885ef3645b]\n-->\n",
				"reviewers": []
			}
		]
	},
	"extensions": {
		"operationName": "onPullRequest",
		"query_id": "e5e18e45-fab1-4291-82a1-fd31de649e24",
		"correlation_id": "28b22a34-18f7-49e9-917e-1c3d74183664",
		"request_id": "27a07060aec17074e4de9abd631ffdcc"
	}
}
```

## GitHub > push

```json
{
	"data": {
		"Push": [
			{
				"after": {
					"author": {
						"login": "cdupuis",
						"person": {
							"chatId": {
								"chatTeam": {
									"id": "T29E48P34"
								},
								"screenName": "cd"
							},
							"emails": [
								{
									"address": "cd@atomist.com"
								}
							],
							"forename": "Christian",
							"gitHubId": {
								"login": "cdupuis"
							},
							"name": "Christian Dupuis",
							"surname": "Dupuis"
						}
					},
					"committer": {
						"login": "cdupuis",
						"person": {
							"chatId": {
								"chatTeam": {
									"id": "T29E48P34"
								},
								"screenName": "cd"
							},
							"emails": [
								{
									"address": "cd@atomist.com"
								}
							],
							"forename": "Christian",
							"gitHubId": {
								"login": "cdupuis"
							},
							"name": "Christian Dupuis",
							"surname": "Dupuis"
						}
					},
					"message": "npm license usage update\n\n[atomist:generated]\n[atomist-skill:atomist/npm-license-usage-skill]",
					"sha": "8f7a4470c94bef1f63f8b96f65a44161ab02b68f",
					"statuses": [],
					"tags": [
						{
							"name": "2.1.9-14",
							"release": null
						}
					],
					"url": "https://github.com/atomist-skills/github-auto-rebase-skill/commit/8f7a4470c94bef1f63f8b96f65a44161ab02b68f"
				},
				"branch": "master",
				"commits": [
					{
						"author": {
							"login": "cdupuis",
							"person": {
								"chatId": {
									"chatTeam": {
										"id": "T29E48P34"
									},
									"screenName": "cd"
								},
								"emails": [
									{
										"address": "cd@atomist.com"
									}
								],
								"forename": "Christian",
								"gitHubId": {
									"login": "cdupuis"
								},
								"name": "Christian Dupuis",
								"surname": "Dupuis"
							}
						},
						"committer": {
							"login": "cdupuis",
							"person": {
								"chatId": {
									"chatTeam": {
										"id": "T29E48P34"
									},
									"screenName": "cd"
								},
								"emails": [
									{
										"address": "cd@atomist.com"
									}
								],
								"forename": "Christian",
								"gitHubId": {
									"login": "cdupuis"
								},
								"name": "Christian Dupuis",
								"surname": "Dupuis"
							}
						},
						"message": "npm license usage update\n\n[atomist:generated]\n[atomist-skill:atomist/npm-license-usage-skill]",
						"sha": "8f7a4470c94bef1f63f8b96f65a44161ab02b68f"
					}
				],
				"repo": {
					"channels": [
						{
							"channelId": "CUCHNG75H",
							"name": "github-auto-rebase-skill",
							"team": {
								"id": "T29E48P34"
							}
						}
					],
					"defaultBranch": "master",
					"name": "github-auto-rebase-skill",
					"org": {
						"owner": "atomist-skills",
						"ownerType": "organization",
						"provider": {
							"apiUrl": "https://api.github.com/",
							"providerId": "624642c2-a2c4-4cfb-b1b7-8752739dcfb9",
							"providerType": "github_com",
							"url": "https://github.com/"
						}
					},
					"owner": "atomist-skills",
					"url": "https://github.com/atomist-skills/github-auto-rebase-skill"
				},
				"timestamp": "2020-08-25T15:08:52.116Z"
			}
		]
	},
	"extensions": {
		"operationName": "onPush",
		"query_id": "c8ebb580-af09-42ef-9a44-6ab5d48b009a",
		"correlation_id": "13723446-0eb1-4747-8626-c4185a5bde5a",
		"request_id": "018e4b54cc86348066d4d45cada74359"
	}
}
```

## GitHub > release

```json
{
	"data": {
		"Release": [
			{
				"name": "",
				"tag": {
					"commit": {
						"message": "Version: increment after 2.1.2 release\n\n[atomist:generated]",
						"repo": {
							"channels": [
								{
									"channelId": "CUCHNG75H",
									"name": "github-auto-rebase-skill",
									"team": {
										"id": "T29E48P34"
									}
								}
							],
							"defaultBranch": "master",
							"name": "github-auto-rebase-skill",
							"org": {
								"owner": "atomist-skills",
								"ownerType": "organization",
								"provider": {
									"apiUrl": "https://api.github.com/",
									"providerId": "624642c2-a2c4-4cfb-b1b7-8752739dcfb9",
									"providerType": "github_com",
									"url": "https://github.com/"
								}
							},
							"owner": "atomist-skills",
							"url": "https://github.com/atomist-skills/github-auto-rebase-skill"
						},
						"sha": "0a247d6bad2271c854e00fa469d5395a7f766859"
					},
					"description": null,
					"name": "2.1.2",
					"release": {
						"name": "",
						"timestamp": "2020-05-13T15:24:10.649Z"
					},
					"timestamp": "2020-05-13T15:24:10.349Z"
				}
			}
		]
	},
	"extensions": {
		"operationName": "onRelease",
		"query_id": "2a91ac9a-6bb2-4cdc-83fd-1fb7e5adffff",
		"correlation_id": "960a4282-8ac9-465e-8798-bf806e657957",
		"request_id": "4d5909194b6f8a35509261b6ef39e47c"
	}
}
```

## GitHub > pull request review

```json
{
	"data": {
		"Review": [
			{
				"body": "LGTM",
				"by": [
					{
						"login": "cdupuis",
						"person": {
							"chatId": {
								"chatTeam": {
									"id": "T29E48P34"
								},
								"screenName": "cd"
							},
							"emails": [
								{
									"address": "cd@atomist.com"
								}
							],
							"forename": "Christian",
							"gitHubId": {
								"login": "cdupuis"
							},
							"name": "Christian Dupuis",
							"surname": "Dupuis"
						}
					}
				],
				"pullRequest": {
					"labels": [
						{
							"name": "changelog:changed"
						},
						{
							"name": "auto-merge:on-approve"
						},
						{
							"name": "auto-merge-method:merge"
						},
						{
							"name": "auto-branch-delete:on-close"
						}
					],
					"updatedAt": "2020-07-28T07:49:17Z",
					"number": 15,
					"createdAt": "2020-07-24T19:10:07Z",
					"title": "Update category",
					"author": {
						"login": "jrday",
						"person": {
							"chatId": {
								"chatTeam": {
									"id": "T29E48P34"
								},
								"screenName": "jrday"
							},
							"emails": [
								{
									"address": "jryanday@gmail.com"
								}
							],
							"forename": "Ryan",
							"gitHubId": {
								"login": "jrday"
							},
							"name": "Ryan Day",
							"surname": "Day"
						}
					},
					"head": {
						"author": {
							"login": "cdupuis",
							"person": {
								"chatId": {
									"chatTeam": {
										"id": "T29E48P34"
									},
									"screenName": "cd"
								},
								"emails": [
									{
										"address": "cd@atomist.com"
									}
								],
								"forename": "Christian",
								"gitHubId": {
									"login": "cdupuis"
								},
								"name": "Christian Dupuis",
								"surname": "Dupuis"
							}
						},
						"committer": {
							"login": "cdupuis",
							"person": {
								"chatId": {
									"chatTeam": {
										"id": "T29E48P34"
									},
									"screenName": "cd"
								},
								"emails": [
									{
										"address": "cd@atomist.com"
									}
								],
								"forename": "Christian",
								"gitHubId": {
									"login": "cdupuis"
								},
								"name": "Christian Dupuis",
								"surname": "Dupuis"
							}
						},
						"message": "Update skill dependency",
						"sha": "3c71fe213ece1c3c75cbbc4de2dd7a0843c38e6d"
					},
					"mergeStatus": null,
					"reviews": [
						{
							"body": "LGTM",
							"by": [
								{
									"login": "cdupuis",
									"person": {
										"chatId": {
											"chatTeam": {
												"id": "T29E48P34"
											},
											"screenName": "cd"
										},
										"emails": [
											{
												"address": "cd@atomist.com"
											}
										],
										"forename": "Christian",
										"gitHubId": {
											"login": "cdupuis"
										},
										"name": "Christian Dupuis",
										"surname": "Dupuis"
									}
								}
							],
							"state": "approved"
						}
					],
					"action": "closed",
					"repo": {
						"channels": [
							{
								"channelId": "CUCHNG75H",
								"name": "github-auto-rebase-skill",
								"team": {
									"id": "T29E48P34"
								}
							}
						],
						"defaultBranch": "master",
						"name": "github-auto-rebase-skill",
						"org": {
							"owner": "atomist-skills",
							"ownerType": "organization",
							"provider": {
								"apiUrl": "https://api.github.com/",
								"providerId": "624642c2-a2c4-4cfb-b1b7-8752739dcfb9",
								"providerType": "github_com",
								"url": "https://github.com/"
							}
						},
						"owner": "atomist-skills",
						"url": "https://github.com/atomist-skills/github-auto-rebase-skill"
					},
					"base": {
						"author": {
							"login": "cdupuis",
							"person": {
								"chatId": {
									"chatTeam": {
										"id": "T29E48P34"
									},
									"screenName": "cd"
								},
								"emails": [
									{
										"address": "cd@atomist.com"
									}
								],
								"forename": "Christian",
								"gitHubId": {
									"login": "cdupuis"
								},
								"name": "Christian Dupuis",
								"surname": "Dupuis"
							}
						},
						"committer": {
							"login": "cdupuis",
							"person": {
								"chatId": {
									"chatTeam": {
										"id": "T29E48P34"
									},
									"screenName": "cd"
								},
								"emails": [
									{
										"address": "cd@atomist.com"
									}
								],
								"forename": "Christian",
								"gitHubId": {
									"login": "cdupuis"
								},
								"name": "Christian Dupuis",
								"surname": "Dupuis"
							}
						},
						"message": "Changelog: add release 2.1.7\n\n[atomist:generated]",
						"sha": "bcf74bf5ca8ca9864e8db3da09aeab642328953d"
					},
					"branch": null,
					"body": "Depends on https://github.com/atomisthq/lore/pull/271",
					"reviewers": [
						{
							"login": "cdupuis",
							"person": {
								"chatId": {
									"chatTeam": {
										"id": "T29E48P34"
									},
									"screenName": "cd"
								},
								"emails": [
									{
										"address": "cd@atomist.com"
									}
								],
								"forename": "Christian",
								"gitHubId": {
									"login": "cdupuis"
								},
								"name": "Christian Dupuis",
								"surname": "Dupuis"
							}
						}
					]
				},
				"state": "approved"
			}
		]
	},
	"extensions": {
		"operationName": "onReview",
		"query_id": "e861af3f-4d66-4be9-a361-7d54b8725477",
		"correlation_id": "5fa24968-6089-4349-9fa7-941cb3ed08ee",
		"request_id": "6b552997ec4cd463ad86182654a82444"
	}
}
```

## GitHub > tag

```json
{
	"data": {
		"Tag": [
			{
				"commit": {
					"message": "npm license usage update\n\n[atomist:generated]\n[atomist-skill:atomist/npm-license-usage-skill]",
					"repo": {
						"channels": [
							{
								"channelId": "CUCHNG75H",
								"name": "github-auto-rebase-skill",
								"team": {
									"id": "T29E48P34"
								}
							}
						],
						"defaultBranch": "master",
						"name": "github-auto-rebase-skill",
						"org": {
							"owner": "atomist-skills",
							"ownerType": "organization",
							"provider": {
								"apiUrl": "https://api.github.com/",
								"providerId": "624642c2-a2c4-4cfb-b1b7-8752739dcfb9",
								"providerType": "github_com",
								"url": "https://github.com/"
							}
						},
						"owner": "atomist-skills",
						"url": "https://github.com/atomist-skills/github-auto-rebase-skill"
					},
					"sha": "8f7a4470c94bef1f63f8b96f65a44161ab02b68f"
				},
				"description": null,
				"name": "2.1.9-14",
				"release": null,
				"timestamp": "2020-08-25T15:15:32.450Z"
			}
		]
	},
	"extensions": {
		"operationName": "onTag",
		"query_id": "0630647b-7c08-4cfc-8ea4-c315379687f3",
		"correlation_id": "55588d74-55e2-45e6-a42d-3dff1d41e1ce",
		"request_id": "73983b1b77629f28dfbfcda492fcfa80"
	}
}
```

## Chat > channel linked

```json
{
	"data": {
		"ChannelLink": [
			{
				"channel": {
					"name": "gcf-deploy-skill",
					"team": {
						"id": "T29E48P34",
						"name": "atomist-community"
					}
				},
				"repo": {
					"channels": [
						{
							"channelId": "CUSKWSXMX",
							"name": "gcf-deploy-skill",
							"team": {
								"id": "T29E48P34",
								"name": "atomist-community"
							}
						}
					],
					"defaultBranch": "master",
					"name": "gcf-deploy-skill",
					"org": {
						"owner": "atomist-skills",
						"ownerType": "organization",
						"provider": {
							"apiUrl": "https://api.github.com/",
							"providerId": "624642c2-a2c4-4cfb-b1b7-8752739dcfb9",
							"providerType": "github_com",
							"url": "https://github.com/"
						}
					},
					"owner": "atomist-skills",
					"url": "https://github.com/atomist-skills/gcf-deploy-skill"
				}
			}
		]
	},
	"extensions": {
		"operationName": "onChannelLink",
		"query_id": "a95e8e2d-5257-45ab-8bcd-3d741e43d045",
		"correlation_id": "25122674-e701-4307-9018-135611ba9014",
		"request_id": "905812316c562aa9d50c93fe8e55e9ea"
	}
}
```

## Chat > new user

```json
{
	"data": {
		"ChatId": [
			{
				"person": {
					"chatId": {
						"chatTeam": {
							"id": "T29E48P34"
						},
						"screenName": "cd"
					},
					"emails": [
						{
							"address": "cd@atomist.com"
						}
					],
					"forename": "Christian",
					"gitHubId": {
						"login": "cdupuis"
					},
					"name": "Christian Dupuis",
					"surname": "Dupuis"
				},
				"screenName": "cd",
				"timezoneLabel": "Pacific Daylight Time"
			}
		]
	},
	"extensions": {
		"operationName": "onNewUser",
		"query_id": "710e0f6d-f3fe-41cc-9eee-2a05aa905b18",
		"correlation_id": "9ff725a8-39e0-4c21-9614-653c519c1f2a",
		"request_id": "a721d1b4c6ebfc053862d61ee69b455c"
	}
}
```

## Chat > user joined channel

```json
{
	"data": {
		"UserJoinedChannel": [
			{
				"channel": {
					"name": "github-auto-rebase-skill",
					"repos": [
						{
							"channels": [
								{
									"channelId": "CUCHNG75H",
									"name": "github-auto-rebase-skill",
									"team": {
										"id": "T29E48P34"
									}
								}
							],
							"defaultBranch": "master",
							"name": "github-auto-rebase-skill",
							"org": {
								"owner": "atomist-skills",
								"ownerType": "organization",
								"provider": {
									"apiUrl": "https://api.github.com/",
									"providerId": "624642c2-a2c4-4cfb-b1b7-8752739dcfb9",
									"providerType": "github_com",
									"url": "https://github.com/"
								}
							},
							"owner": "atomist-skills",
							"url": "https://github.com/atomist-skills/github-auto-rebase-skill"
						}
					]
				},
				"user": {
					"person": {
						"chatId": {
							"chatTeam": {
								"id": "T29E48P34"
							},
							"screenName": "cd"
						},
						"emails": [
							{
								"address": "cd@atomist.com"
							}
						],
						"forename": "Christian",
						"gitHubId": {
							"login": "cdupuis"
						},
						"name": "Christian Dupuis",
						"surname": "Dupuis"
					},
					"screenName": "cd"
				}
			}
		]
	},
	"extensions": {
		"operationName": "onUserJoiningChannel",
		"query_id": "1de3317d-f399-428d-82cb-946a215f2afb",
		"correlation_id": "c3880a9a-f6db-465d-ada0-ecfae2b1e253",
		"request_id": "df291d7993486f260ff1fd9258570779"
	}
}
```

## Cron schedule

```json
{
	"configurationName": "Docker Container Runner",
	"parameterName": "schedule"
}
```
