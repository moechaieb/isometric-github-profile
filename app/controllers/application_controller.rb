class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  include ApplicationHelper

  def index
    @placeholder = params.fetch('github_username', '')
    calendar = @placeholder.empty? ? [] : scrape_calendar(@placeholder)
    gon.push(calendar: calendar)
  end

  def about

  end
end
