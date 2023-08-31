export const helpBlock = [
    {
        type: 'section',
        text: {
            type: 'mrkdwn',
            text: '\n\n'
        }
    },
    {
        type: 'section',
        text: {
            type: 'mrkdwn',
            text: '*Tasks*'
        }
    },
    {
        type: 'section',
        fields: [
            {
                type: 'plain_text',
                text: ':heavy_plus_sign: :ledger: create OneWordTaskName',
                emoji: true
            },
            {
                type: 'plain_text',
                text: '/tasky create standup',
                emoji: true
            },
            {
                type: 'plain_text',
                text: ':heavy_minus_sign: :ledger: remove task',
                emoji: true
            },
            {
                type: 'plain_text',
                text: '/tasky remove standup',
                emoji: true
            }
        ]
    },
    {
        type: 'divider'
    },
    {
        type: 'section',
        text: {
            type: 'mrkdwn',
            text: '*People*'
        }
    },
    {
        type: 'section',
        fields: [
            {
                type: 'plain_text',
                text: ':heavy_plus_sign: :astronaut: add assignees to task',
                emoji: true
            },
            {
                type: 'plain_text',
                text: '/tasky add-assignee standup @person',
                emoji: true
            },
            {
                type: 'plain_text',
                text: ':heavy_minus_sign: :astronaut: remove assignees from task',
                emoji: true
            },
            {
                type: 'plain_text',
                text: '/tasky remove-assignee standup @person',
                emoji: true
            },
            {
                type: 'plain_text',
                text: ':black_right_pointing_double_triangle_with_vertical_bar: :astronaut: assign next person',
                emoji: true
            },
            {
                type: 'plain_text',
                text: '/tasky next standup',
                emoji: true
            }
        ]
    }
];

export const createTaskSuccess = (taskName: string) => [
    {
        type: 'section',
        text: {
            type: 'mrkdwn',
            text: '\n\n'
        }
    },
    {
        type: 'section',
        text: {
            type: 'mrkdwn',
            text: `*Task ${taskName} created ! :partying_face: :tada: * \n\n*Lets assign some people with following command:*`
        }
    },
    {
        type: 'context',
        elements: [
            {
                type: 'mrkdwn',
                text: `/tasky add-assignee ${taskName} @somebodythatiusedtoknow`
            }
        ]
    }
];

export const createTaskUnSuccess = [
    {
        type: 'section',
        text: {
            type: 'mrkdwn',
            text: '\n\n'
        }
    },
    {
        type: 'section',
        text: {
            type: 'mrkdwn',
            text: '*Task creation failed ! :cry: * \n\n'
        }
    },
    {
        type: 'context',
        elements: [
            {
                type: 'plain_text',
                text: 'Make sure the task name is unique and there is no additional spaces after the taskname.',
                emoji: true
            }
        ]
    },
    {
        type: 'context',
        elements: [
            {
                type: 'mrkdwn',
                text: '*/tasky create taskname1*'
            }
        ]
    },
    {
        type: 'context',
        elements: [
            {
                type: 'plain_text',
                text: 'Or try to remove the already created task.',
                emoji: true
            }
        ]
    },
    {
        type: 'context',
        elements: [
            {
                type: 'mrkdwn',
                text: '*/tasky remove taskname1*'
            }
        ]
    }
];

export const removeTaskSuccess = (taskName: string) => [
    {
        type: 'section',
        text: {
            type: 'mrkdwn',
            text: '\n\n'
        }
    },
    {
        type: 'section',
        text: {
            type: 'mrkdwn',
            text: `:mega: *${taskName} has been successfully deleted ! :mega:*`
        }
    }
];

export const removeTaskUnsuccess = (taskName: string) => [
    {
        type: 'section',
        text: {
            type: 'mrkdwn',
            text: '\n\n'
        }
    },
    {
        type: 'section',
        text: {
            type: 'mrkdwn',
            text: '*Task deletion failed ! :cry: * \n\n'
        }
    },
    {
        type: 'context',
        elements: [
            {
                type: 'plain_text',
                text: `Make sure task with taskname: ${taskName} exists`,
                emoji: true
            }
        ]
    }
];

export const addAssigneeSuccess = (taskname: string, assignee: string) => [
    {
        type: 'section',
        text: {
            type: 'mrkdwn',
            text: '\n\n'
        }
    },
    {
        type: 'section',
        text: {
            type: 'mrkdwn',
            text: `*Assignee ${assignee} added to ${taskname}! :partying_face:: *`
        }
    }
];

export const addAssigneeUnSuccess = (taskName: string) => [
    {
        type: 'section',
        text: {
            type: 'mrkdwn',
            text: '\n\n'
        }
    },
    {
        type: 'section',
        text: {
            type: 'mrkdwn',
            text: "*Assignee couldn't added :cry:: * \n\n"
        }
    },
    {
        type: 'section',
        text: {
            type: 'mrkdwn',
            text: `Make sure you have the correct rights to make changes for ${taskName}`
        }
    }
];

export const removeAssigneeSuccess = (taskname: string, assignee: string) => [
    {
        type: 'section',
        text: {
            type: 'mrkdwn',
            text: '\n\n'
        }
    },
    {
        type: 'section',
        text: {
            type: 'mrkdwn',
            text: `*Assignee ${assignee} removed from ${taskname}! :partying_face:: *`
        }
    }
];

export const removeAssigneeUnSuccess = (taskName: string) => [
    {
        type: 'section',
        text: {
            type: 'mrkdwn',
            text: '\n\n'
        }
    },
    {
        type: 'section',
        text: {
            type: 'mrkdwn',
            text: "*Assignee couldn't be removed :cry:: * \n\n"
        }
    },
    {
        type: 'section',
        text: {
            type: 'mrkdwn',
            text: `Make sure you have the correct rights / assignee is not currently assigned to task ${taskName}`
        }
    }
];

export const nextSuccess = (taskName: string, assignee: string) => [
    {
        type: 'section',
        text: {
            type: 'mrkdwn',
            text: '\n\n'
        }
    },
    {
        type: 'section',
        text: {
            type: 'mrkdwn',
            text: `:mega: *Assignee ${assignee}! You have been summoned for ${taskName} :dart:*`
        }
    }
];

export const nextUnSuccess = (taskName: string) => [
    {
        type: 'section',
        text: {
            type: 'mrkdwn',
            text: '\n\n'
        }
    },
    {
        type: 'section',
        text: {
            type: 'mrkdwn',
            text: '*Getting new assignee was not successful :cry:: * \n\n'
        }
    },
    {
        type: 'section',
        text: {
            type: 'mrkdwn',
            text: `Make sure you have the correct rights to make changes for ${taskName}`
        }
    }
];

export const wrongUsage = [
    {
        type: 'section',
        text: {
            type: 'mrkdwn',
            text: '\n\n'
        }
    },
    {
        type: 'section',
        text: {
            type: 'mrkdwn',
            text: ':thinking_face: *It looks like you didnt pass enough parameters, try: :point_down:*'
        }
    },
    {
        type: 'context',
        elements: [
            {
                type: 'mrkdwn',
                text: '*/tasky help*'
            }
        ]
    }
];
