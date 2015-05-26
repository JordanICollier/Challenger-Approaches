class Api::GroupsController < ApiController
  def index
    render json: Group.find(params[:id])
  end
end
