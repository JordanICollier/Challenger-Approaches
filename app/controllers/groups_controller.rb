class GroupsController < ApplicationController
  def index
    @groups = Group.includes(:location, :members).take(10)
  end

  def show
    @group = Group.find(params[:id])
  end

  def create
    group = Group.create(group_params)
    render json: group
  end

  private

  def group_params
    params.require(:group).permit(:title, :about).tap { |p|
      p[:user_id] = current_user.id
    }
  end
end
