import request from '@/utils/request'

export const getAllChannel = () => {
  return request({
    method: 'GET',
    url: '/app/v1_0/channels'
  })
}
export const addChannels = channels => {
  return request({
    method: 'PATCH',
    url: '/app/v1_0/user/channels',
    data: {
      channels
    }
  })
}
export const delmyChannel = targetID => {
  return request({
    method: 'DELETE',
    url: `/app/v1_0/user/channels/${targetID}`
  })
}
