import { IBaseModel, IConversationStyle } from '@/services'

export enum TrialPeriod {
  TOKENS = 100000, // How many tokens will users receive on trial period?
  DAYS = 7, //  Validity period of TOKENS
}

export const defaultBaseModel: IBaseModel = 'claude_4_5_sonnet'

export const lsConversationStyleKey = 'conversation_style'
export const defaultConversationStyle: IConversationStyle = 'normal'
