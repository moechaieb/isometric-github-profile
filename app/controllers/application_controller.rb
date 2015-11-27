class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  include ApplicationHelper

  def index
    @github = params['github']
    gon.push calendar: @github.nil? ? [] : scrape_calendar(@github)
  end
end
