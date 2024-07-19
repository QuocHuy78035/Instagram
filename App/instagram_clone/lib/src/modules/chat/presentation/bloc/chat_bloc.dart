import 'package:bloc/bloc.dart';
import 'package:instagram_clone/src/modules/chat/domain/usecase/user_create_conversation.dart';
import 'package:instagram_clone/src/modules/chat/presentation/bloc/chat_event.dart';
import 'package:instagram_clone/src/modules/chat/presentation/bloc/chat_state.dart';
import '../../domain/usecase/user_send_message.dart';

class ChatBloc extends Bloc<ChatEvent, ChatState> {
  final UserCreateConversation _userCreateConversation;
  final UserSendMessage _userSendMessage;

  ChatBloc(
      {required UserCreateConversation userCreateConversation, required UserSendMessage userSendMessage})
      : _userCreateConversation = userCreateConversation, _userSendMessage = userSendMessage,
        super(ChatInitial()) {
    on<CreateChatEvent>(_onCreateChat);
    on<CreateConversationEvent>(_onCreateConversation);
  }

  _onCreateChat(CreateChatEvent event, Emitter<ChatState> emit) async {
    emit(ChatLoadingState());
    final message = await _userSendMessage(SendMessageParams(
        conversationId: event.conversationId, message: event.message));
    message.fold(
        (failure) =>
            emit(CreateChatError()),
        (stories) {
      emit(CreateChatSuccess());
    });
  }

  _onCreateConversation(
      CreateConversationEvent event, Emitter<ChatState> emit) async {
    emit(ChatLoadingState());
    final conversation = await _userCreateConversation(event.userId);
    conversation.fold((failure) => emit(CreateConversationError()), (stories) {
      emit(CreateConversationSuccess());
    });
  }
}
