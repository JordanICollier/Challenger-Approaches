class GroupUsersController < ApplicationController

  def create
    group_user = GroupUser.create(group_user_params)
    render json: group_user
  end
  private

  def group_user_params
    params.require(:group_user).permit(:group_id).tap {|p|
      p[:user_id] = current_user.id
    }
  end
end
