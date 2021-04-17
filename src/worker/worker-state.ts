export enum WorkerStateType {
    //worker seeking for task
    SEEK = 0,
    //worker is on harvesting path
    HARVEST = 1
}

/**
 * Worker state changes based on experiences and thresholds. So we need to know what and when
 * 
 * Needs to be a serializable object, basic JSON so we can store it to memory
 */
export type WorkerState = {
    //type? kind? state-state?
    type: WorkerStateType
    //when did the state change
    time: number
}
