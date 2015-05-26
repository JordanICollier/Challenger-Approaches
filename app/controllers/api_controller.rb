class ApiController < ActionController::Metal
  include AbstractController::Rendering
  include ActionController::MimeResponds
  include ActionController::Renderers::All
  include ActionController::ImplicitRender
end
