import graphene
from graphene_django import DjangoObjectType
from django.utils import timezone

from apps.cookbook.models import Ingredient, Category
from apps.cookbook.schema import CookbookQuery


class Query(CookbookQuery, graphene.ObjectType):

    motd = graphene.Field(graphene.String, required=True)

    def resolve_motd(root, info):
        return f"Hello {info.context.user}! The time on the server is {timezone.now()}"


schema = graphene.Schema(query=Query)
