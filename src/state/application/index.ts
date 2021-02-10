import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { ApplicationModal } from './types'

export interface IApplicationState {
  readonly openModal: ApplicationModal | null
}

const initialState: IApplicationState = {
  openModal: null,
}

const ApplicationSlice = createSlice({
  name: 'application',
  initialState,
  reducers: {
    setOpenModal(state, action: PayloadAction<ApplicationModal | null>) {
      state.openModal = action.payload
    },
  },
})

export const { setOpenModal } = ApplicationSlice.actions

export default ApplicationSlice.reducer
