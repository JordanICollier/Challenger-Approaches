class Api::GroupsController < ApiController
  def index
    render json: GroupRepresenter.new(params[:id])
  end

  class GroupRepresenter
    attr_reader :group
    def initialize(id)
      @group = Group.includes(:location).find(id)
    end

    def as_json(options={})
      {
        title: group.title,
        about: group.about,
        location: group.location.formatted_address
      }
    end
  end
end
