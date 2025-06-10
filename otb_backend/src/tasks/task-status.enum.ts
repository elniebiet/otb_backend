//**************************************************************************/
//*** Interface no longer needed as we are now connecting to the DB ********/
//**************************************************************************/
// export interface Task {
//     id: string;
//     title: string;
//     description: string;
//     status: TaskStatus;
// }

export enum TaskStatus {
    OPEN = 'OPEN',
    IN_PROGRESS = 'IN_PROGRESS',
    DONE = 'DONE',
}
