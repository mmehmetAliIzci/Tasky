export type OperationType = 'create' | 'remove' | 'add-assignee' | 'remove-assignee' | 'next' | 'help' | '';

interface OperationDetails {
  argumentCount: 'single' | 'multiple';
}

const allowedOperations: Record<OperationType, OperationDetails> = {
    create: { argumentCount: 'multiple' },
    remove: { argumentCount: 'multiple' },
    'add-assignee': { argumentCount: 'multiple' },
    'remove-assignee': { argumentCount: 'multiple' },
    next: { argumentCount: 'multiple' },
    help: { argumentCount: 'single' },
    '': { argumentCount: 'single' }
};

export interface ParsedCommand {
  operation: OperationType;
  nameOfTheTask: string;
  users?: Array<string>;
}

export function parseTaskCommand (text: string): ParsedCommand {
    const commands = text.trim().split(/\s+/);
    const [operationCandidate, nameOfTheTask, ...users] = commands;
    const operation = Object.keys(allowedOperations).find(
        (cmd) => cmd === operationCandidate.toLowerCase()
    ) as OperationType;

    if (!operation) {
        throw new Error('Invalid operation');
    }

    const details = allowedOperations[operation];

    if (details.argumentCount === 'multiple' && nameOfTheTask) {
        return { operation, nameOfTheTask, users };
    }

    if (details.argumentCount === 'single' && !nameOfTheTask) {
        return { operation, nameOfTheTask: '' };
    }

    throw new Error('Not enough parameters');
}
